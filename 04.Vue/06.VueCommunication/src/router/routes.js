const Home = () => import("../views/Home");
const Props = () => import("../views/Props");
const MyEvents = () => import("../views/MyEvents");
const GlobolEventsBus = () => import("../views/GlobolEventsBus");
const Vmodel = () => import("../views/Vmodel");
const Sync = () => import("../views/Sync");
const AttrsAndListeners = () => import("../views/AttrsAndListeners");
const ChildrenAndParent = () => import("../views/ChildrenAndParent");

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
  },
  {
    path: "/sync",
    name: "sync",
    component: Sync
  },
  {
    path: "/attrsandlisteners",
    name: "attrsAndListeners",
    component: AttrsAndListeners
  },
  {
    path: "/childrenandparent",
    name: "ChildrenAndParent",
    component: ChildrenAndParent
  }
];

export default routes;
