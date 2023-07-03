import EventEmitter from "eventemitter3";
import type {
  SocketEventData,
  SocketEventNames,
  SocketEvents,
} from "./types/events";

class EE {
  private ee: EventEmitter;

  constructor() {
    this.ee = new EventEmitter();
  }
  public dispatch<T extends keyof SocketEvents>(
    type: SocketEventNames,
    data: SocketEventData<T>
  ) {
    this.ee.emit(type, data);
  }
  public on<T extends keyof SocketEvents>(
    type: T,
    listener: (data: SocketEventData<T>) => void
  ) {
    this.ee.on(type, listener);
  }
  public off<T extends keyof SocketEvents>(
    type: T,
    listener: (data: SocketEventData<T>) => void
  ) {
    this.ee.off(type, listener);
  }
}

export default EE;
