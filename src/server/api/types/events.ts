/**
 * Socket Events
 * @description
 * These are the events that the server will emit to the client. To add a new event, add it to the SocketEvents interface.
 * @example
 * {
 *  "session.started": {
 *    id: string;
 *  }
 * }
 */
export interface SocketEvents {
  "session.started": {
    id: string;
    name: string;
    participantCount: number;
  };
  "session.ended": {
    id: string;
  };
  "session.updated": {
    id: string;
    name: string;
    participantCount: number;
  };
  "session.user_join": {
    session_id: string;
    session_name: string;
    user: {
      id: string;
      name: string;
    };
  };
  "session.user_leave": {
    session_id: string;
    session_name: string;
    user: {
      id: string;
      name: string;
    };
  };
}

export type SocketEventData<T extends keyof SocketEvents> = SocketEvents[T];

export type SocketEventNames = keyof SocketEvents;
