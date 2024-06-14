import express from 'express';
// import HistoryRoutes from "./HistoryRoutes/index.js"
import WeatherRoutes from "./WeatherRoutes/index.js"

const router=express.Router()
 router.use('/weather',WeatherRoutes)
//  router.use('/history',HistoryRoutes)

export default router;
