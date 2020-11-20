class EventEmmiter {
  constructor() {
    // 存储事件的容器
    this._events = {
      // eventName: [listener1, listener2...]
    };
  }

  // 绑定事件
  on(eventName, listener) {
    if (this._events[eventName]) {
      // 说明之前添加过事件
      this._events[eventName].push(listener);
    } else {
      // 说明之前没有值
      this._events[eventName] = [listener];
    }
  }
  // 绑定一次性事件：触发一次后自动解绑
  once(eventName, listener) {
    const lis = (...data) => {
      // 解绑事件
      this.off(eventName, lis);
      // 触发事件回调函数
      listener(...data);
    };
    this.on(eventName, lis);
  }
  // 解绑事件
  off(eventName, listener) {
    if (!this._events[eventName]) {
      return;
    }

    if (listener) {
      // 传入了listener，解绑一个回调
      this._events[eventName] = this._events[eventName].filter(
        (lis) => lis !== listener
      );
    } else {
      // 没有传入listener，解绑所有回调
      this._events[eventName] = null;
    }
  }
  // 触发事件
  emit(eventName, ...data) {
    /*
      ...data 代表剩下所有参数
        例如：
          emit('xxx', 1, 2, 3, 4)
          data --> [1, 2, 3, 4]
    */
    if (!this._events[eventName]) {
      return;
    }

    // ...data --> 展开数组，将数组中的值作为参数传入函数中
    this._events[eventName].forEach((listener) => listener(...data));
  }
}

const myEvent = new EventEmmiter();

const cb = function () {
  console.log(111);
};

myEvent.on("aaa", cb);

// myEvent.once("aaa", function () {
//   console.log(222);
// });

myEvent.on("aaa", function () {
  console.log(222);
});


myEvent.emit("aaa");
myEvent.off("aaa");
// myEvent.off("aaa", cb);
myEvent.emit("aaa");
