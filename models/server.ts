import express,{Application} from "express";
import userRoutes from "../routes/usuario";
import perRoutes from "../routes/persona";
import rolRoutes from "../routes/rol";
import authRoutes from "../routes/auth";
import piSolicitudRoutes from "../routes/pi-solicitud";
import puntoInteresRoutes from "../routes/punto-interes";
import requermientoPiRoutes from "../routes/requisito-pi";
import menuRoutes from "../routes/menu";
import imagenRoutes from "../routes/imagen";
import categoriaRoutes from "../routes/categoria";
import diaHoraRoutes from "../routes/dia-hora";
import horaPiRoutes from "../routes/hora-pi";
import itinerarioRoutes from "../routes/itinerario";
import PiItinerarioRoutes from "../routes/itineraio-dia";
import calificaionRoutes from "../routes/calificacion";
import picategoriaRoutes from "../routes/pi-categoria";

/** RUTAS DE SENTENCIAS */
import estadoSoliRoutes from "../routes/details/solicitud-pi";
import itnerariosPerRoutes from "../routes/details/itinerarios";
import numItiRoutes from "../routes/details/numero-itinerario";
import numLugaresRoutes from "../routes/details/numero-lugar";
import numDiasRoutes from "../routes/details/numero-dia";
import nummMinRoutes from "../routes/details/numero-min";
import numCaliRoutes from "../routes/details/numero-calificacion";
import itiDiaRoutes from "../routes/details/dia-itinerario";
import horaPiConsRoutes from "../routes/details/hora-pi";
import estadoSoliConsRoutes from "../routes/details/estado-solicitud";
import solicitudesConsRoutes from "../routes/details/solicitudes";
import totalCategoriasConsRoutes from "../routes/admin/total-categorias";
import imagesConsRoutes from "../routes/details/images";
import requiConsRoutes from "../routes/details/requisitos";
import itinerarioLugarConsRoutes from "../routes/details/lugar-itinerario";
import visitasFechaConsRoutes from "../routes/details/visitas-fecha";
import luugaresCercanosConsRoutes from "../routes/details/lugares-cercanos";
import listaVisitadosConsRoutes from "../routes/admin/lista-visitados";
import infoLugar from "../routes/admin/informacion-lugar";
import infoPersona from "../routes/details/info-persona";
import caliLugaresConsRoutes from "../routes/admin/lugares-calificaciones";
import caliGeneralLugarConsRoutes from "../routes/location/calificaiones";
import comentariosLugarConsRoutes from "../routes/location/comentarios";

import cors from "cors";
import db from "../db/conexion";


class Server{

    private app: Application;
    private port: string;
    private apiPaths = {
       
        usuarios:'/api/usuarios',
        authPah:'/api/auth',
        personas:'/api/personas',
        roles:'/api/roles',
        piSolicitudes: '/api/piSolicitudes',
        puntosInteres:'/api/puntosInteres',
        piRequerimiento:'/api/piRequisitos',
        menus:'/api/menu',
        imagenes:'/api/imagen',
        categorias:'/api/categoria',
        estadoSolicitud:'/api/estadoSoli',
        itinerarios:'/api/itinerarios',
        PiItinerarios:'/api/DiaItinerarios',
        DiaHora:'/api/DiaHoras',
        HoraPi:'/api/HoraPis',
        calificaiones:'/api/calificaiones',
        picategoria:'/api/picategoria',
        //
        itiPer:'/cons/itineraioPer',
        numIti:'/cons/numIti',
        numLug:'/cons/numLug',
        numDia:'/cons/numDia',
        numMin:'/cons/numMin',
        numCal:'/cons/numCal',
        diaIti:'/cons/diaIti',
        horaPiCal:'/cons/horaPiCal',
        estadoSoli:'/cons/estadoSoli',
        solicitudes:'/cons/solicitudes',
        totalCate:'/cons/totalCate',
        images:'/cons/images',
        requisitos:'/cons/requisitos',
        lugaresCercanos:'/cons/lugareCerca',
        itinerarioLugar:'/cons/itiLugar',
        visitasFecha:'/cons/visitasFecha',
        listaVisitados:'/cons/listaVisitados',
        infoLugar:'/cons/infoLugar',
        infoPersona:'/cons/infoPersona',
        caliLugaresGeneral:'/cons/caliLugaresGeneral',
        caliLugarGeneral:'/cons/caliLugarGeneral',
        comentariosLugar:'/cons/comentariosLugar',
    }

    constructor(){
        this.app =  express();
        this.port = process.env.PORT || '8000';
        
        //metodos iniciales
        this.dbConexion();
        this.middlewares();
        this.routes();
    }
    async dbConexion(){
        try {
            await db.authenticate();
            console.log('Data base online');

        } catch (error) {
            console.log(error);
            throw new Error('No se conecto');
        }
    }

    middlewares(){
        //CORS
        this.app.use(cors());

        //Lectura del body
        this.app.use(express.json());
        //Carpeta publica
        this.app.use(express.static('public'));

    }

    routes(){
        this.app.use(this.apiPaths.usuarios, userRoutes),
        this.app.use(this.apiPaths.authPah, authRoutes),
        this.app.use(this.apiPaths.personas, perRoutes),
        this.app.use(this.apiPaths.roles, rolRoutes),
        this.app.use(this.apiPaths.piSolicitudes, piSolicitudRoutes),
        this.app.use(this.apiPaths.puntosInteres, puntoInteresRoutes),
        this.app.use(this.apiPaths.piRequerimiento, requermientoPiRoutes),
        this.app.use(this.apiPaths.menus, menuRoutes)
        this.app.use(this.apiPaths.imagenes,imagenRoutes)
        this.app.use(this.apiPaths.categorias,categoriaRoutes)
        this.app.use(this.apiPaths.estadoSolicitud,estadoSoliRoutes)
        this.app.use(this.apiPaths.itiPer,itnerariosPerRoutes)
        this.app.use(this.apiPaths.itinerarios,itinerarioRoutes)
        this.app.use(this.apiPaths.PiItinerarios,PiItinerarioRoutes)
        this.app.use(this.apiPaths.DiaHora,diaHoraRoutes)
        this.app.use(this.apiPaths.HoraPi,horaPiRoutes)
        this.app.use(this.apiPaths.calificaiones,calificaionRoutes)
        this.app.use(this.apiPaths.picategoria,picategoriaRoutes)
        /*TODO: CONSULTAS */
        this.app.use(this.apiPaths.numIti,numItiRoutes)
        this.app.use(this.apiPaths.numLug,numLugaresRoutes)
        this.app.use(this.apiPaths.numDia,numDiasRoutes)
        this.app.use(this.apiPaths.numMin,nummMinRoutes)
        this.app.use(this.apiPaths.numCal,numCaliRoutes)
        this.app.use(this.apiPaths.diaIti,itiDiaRoutes)
        this.app.use(this.apiPaths.horaPiCal,horaPiConsRoutes)
        this.app.use(this.apiPaths.estadoSoli,estadoSoliConsRoutes)
        this.app.use(this.apiPaths.solicitudes,solicitudesConsRoutes)
        this.app.use(this.apiPaths.totalCate,totalCategoriasConsRoutes)
        this.app.use(this.apiPaths.images,imagesConsRoutes)
        this.app.use(this.apiPaths.requisitos,requiConsRoutes)
        this.app.use(this.apiPaths.lugaresCercanos, luugaresCercanosConsRoutes)
        this.app.use(this.apiPaths.itinerarioLugar, itinerarioLugarConsRoutes)
        this.app.use(this.apiPaths.visitasFecha, visitasFechaConsRoutes)
        this.app.use(this.apiPaths.listaVisitados, listaVisitadosConsRoutes)
        this.app.use(this.apiPaths.infoLugar, infoLugar)
        this.app.use(this.apiPaths.infoPersona, infoPersona)
        this.app.use(this.apiPaths.caliLugaresGeneral, caliLugaresConsRoutes)
        this.app.use(this.apiPaths.caliLugarGeneral, caliGeneralLugarConsRoutes)
        this.app.use(this.apiPaths.comentariosLugar, comentariosLugarConsRoutes)
    }

    listen(){
        this.app.listen(this.port,()=>{
            console.log('Servidor corriendo en puerto'+ this.port);
        })
    }
}

export default Server;