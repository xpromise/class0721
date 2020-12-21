const Home = () => import("../views/Home");
const Props = () => import("../views/Props");
const MyEvents = () => import("../views/MyEvents");
const GlobolEventsBus = () => import("../views/GlobolEventsBus");
const Vmodel = () => import("../views/Vmodel");

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/props",
    name: "Props",
    component: Props
  },
  {
    path: "/myevents",
    name: "MyEvents",
    component: MyEvents
  },
  {
    path: "/globoleventsbus",
    name: "GlobolEventsBus",
    component: GlobolEventsBus
  },
  {
    path: "/vmodel",
    name: "vmodel",
    component: Vmodel
  }
];

export default routes;
