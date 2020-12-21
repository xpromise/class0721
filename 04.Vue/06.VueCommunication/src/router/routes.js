const Home = () => import("../views/Home");
const Props = () => import("../views/Props");
const MyEvents = () => import("../views/MyEvents");

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
  }
];

export default routes;
