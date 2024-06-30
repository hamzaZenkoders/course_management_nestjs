import { Socket } from 'socket.io';
export declare class MyGateway {
    socket: Socket;
    onNewMessage(body: any, client: Socket): void;
    handleDisconnect(client: Socket): void;
    handleConnection(client: Socket): void;
}
