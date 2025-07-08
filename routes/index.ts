/* eslint-disable @typescript-eslint/no-unused-vars */
import db from 'db/index.js';
import delay from 'delay';
import express from 'express';

const router = express.Router();
const baseUrl = process.env.GAME_API_BASE_URL;
const gameApiToken = process.env.GAME_API_TOKEN;

/* GET home page. */
router.get('/', (req, res, next) => {
  return res.send('in server');
});

router.get('/test', async (req, res, next) => {
  // TODO: try to add things to the queue that is
  //  currently running in the background
  //  and see if it works

  // const response = await db.System.findAll();
  // console.log('response :>> ', response);
  res.send('in server test');
});

// TODO: break this out into a separate file when it makes sense to do so
router.post('/my/ships/:shipSymbol/scan/systems', async (req, res, next) => {
  let response;
  const { shipSymbol } = req.params;

  try {
    response = await fetch(`${baseUrl}/my/ships/${shipSymbol}/scan/systems`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${gameApiToken}`,
      },
    });

    delay(1000);
  } catch (err) {
    console.error(err);
    return res.status(500).end(err);
  }

  if (!response.ok) {
    const body = await response.json();
    if (body && body.error) {
      return res.status(response.status).json(body);
    } else {
      return res.status(response.status).end(response.statusText);
    }
  }

  if (response.status === 204) {
    return res.status(204).end();
  }

  const resJson = await response.json();
  console.log('resJson :>> ', resJson);

  if (!resJson.data) {
    return res.status(200).json(resJson);
  }

  const { cooldown, systems }: { cooldown: CooldownAttributes; systems: ScannedSystemAttributes[] } = resJson.data;
  console.log('cooldown :>> ', cooldown);
  console.log('systems :>> ', systems);

  // try {
  //   for await (const system of systems) {
  //     // find if system exists in our database
  //     const systemExists = await db.System.findOne({ where: { symbol: system.symbol } });

  //     // if not, make a request to the game api to get the system details
  //     if (!systemExists) {
  //       const response = await fetch(`${baseUrl}/systems/${system.symbol}`, {
  //         method: 'POST',
  //         headers: {
  //           'Content-Type': 'application/json',
  //           Authorization: `Bearer ${gameApiToken}`,
  //         },
  //       });

  //       if (!response.ok) {
  //         const errorBody = await response.json();
  //         throw new Error(errorBody);
  //       }

  //       const { data }: { data: SystemAttributes } = await response.json();
  //       console.log('data :>> ', data);

  //       // add the system to our database
  //       // db.System.create(data);

  //       delay(1000);
  //     }
  //   }
  // } catch (err) {
  //   console.error(err);
  //   return res.status(500).end(err);
  // }

  // try {
  //   await db.System.create(scannedSystems);
  // } catch (e) {
  //   console.error(e);
  // }
  // db.System.bulkCreate(data);

  // TODO: return the data
  return res.status(200).json({ cooldown, systems });
});

export default router;
