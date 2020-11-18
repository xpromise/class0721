class EventEmmiter {
  constructor() {}

  on(eventName, listener) {}
  once(eventName, listener) {}
  off(eventName, listener) {}
  emit(eventName, ...data) {}
}

const myEvent = new EventEmmiter();

const cb = function () {
  console.log(111);
};

myEvent.on("aaa", cb);

myEvent.once("aaa", function () {
  console.log(222);
});

myEvent.off("aaa", cb);
myEvent.off("aaa");

myEvent.emit("aaa");
myEvent.emit("aaa");
