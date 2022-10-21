const { Router } = require("express");
const axios = require("axios");
const { Countries, Activities } = require("../db");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

const getApiInfo = async () => {
  try {
    const apiUrl = await axios.get("https://restcountries.com/v3/all");
    const apiInfo = await apiUrl.data.map((el) => {
      return {
        id: el.cca3,
        name: el.name.common,
        image: el.flags[1],
        continents: el.continents[0],
        capital: el.capital,
        subregion: el.subregion,
        area: el.area,
        population: el.population,
        activities: el.activities,
      };
    });

    return apiInfo;
  } catch (error) {
    console.log(error);
  }
};

const getDbInfo = async () => {
  try {
    const dbActivities = await Countries.findAll({
      include: {
        model: Activities,
        attributes: ["name", "dificultad", "duracion", "temportada"],
        through: [],
      },
    });
    const newDbSctivities = dbActivities.map((el) => {
      return {
        id: el.cca3,
        name: el.name.common,
        image: el.flags[1],
        continents: el.continents[0],
        capital: el.capital,
        subregion: el.subregion,
        area: el.area,
        population: el.population,
        activities: el.activities.map((el) => el.name),
        createdInDb: el.createdInDb,
      };
    });
    return newDbSctivities;
  } catch (error) {
    console.log(error);
  }
};

const getAllInfo = async () => {
  try {
    const api = await getApiInfo();
    const db = await getDbInfo();
    const all = api.concat(db);

    return all;
  } catch (error) {
    console.log(error);
  }
};

router.get("/countries", async (req, res) => {
  const allCoutries = await getAllInfo();
  const { name } = req.query;
  try {
    if (name) {
      let countriesName = await allCoutries.filter((e) =>
        e.name.toLowerCase().includes(name.toLowerCase())
      );
      countriesName
        ? res.status(200).send(countriesName)
        : res.status(404).send("no se encontro el pais");
    } else {
      res.status(200).send(allCoutries);
    }
  } catch (error) {
    console.log(error);
  }
});

router.get("/countries/:id", async (req, res) => {
  const allCoutries = await getAllInfo();
  const { id } = req.params;
  try {
    if (id) {
      let countriesId = await allCoutries.filter((e) => e.id == id);

      countriesId
        ? res.status(200).send(countriesId)
        : res.status(404).send("no se encontro el id");
    } else {
      res.status(200).send(allCoutries);
    }
  } catch (error) {
    console.log(error);
  }
});

router.get("/activities", async (req, res) => {
  try {
    let activities = await Activities.findAll();
    if (activities) {
      return res.status(200).send(activities);
    } else {
      res.status(404).send("no hay actividades");
    }
  } catch (error) {
    console.log(error);
  }
});

router.post("/activities", async (req, res) => {
    const { name, dificultad, duracion, temportada } = req.body;
    try {
 if(!name, !dificultad, !duracion, !temportada ){
    const NewActivitie = await Activities.create({ 
        name,
        dificultad,
        duracion,
        temportada,
    })
    const createInDb = await Activities.findAll({
        where: { name, dificultad, duracion, temportada}
    })
    NewActivitie.addActivities(createInDb)
    return res.status(200).send("actividad creada")
 }else {
    return res.status(404).send("actividad no creada")
 }
} catch (error) {
    console.log(error);
  }
});

module.exports = router;
