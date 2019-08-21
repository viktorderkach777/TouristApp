import React from 'react';


const SinglePage = React.lazy(()=>import('../components/client/tours/singleTour/SingleTour'));
const Salo = React.lazy(()=>import("../components/client/Salo"))

const routes=[
    {path: '/singlepage',exact:true ,name: 'Готель' , component: SinglePage },
    {path: "/ss", exact:true, name: "ss", component: Salo}
];
export default routes;