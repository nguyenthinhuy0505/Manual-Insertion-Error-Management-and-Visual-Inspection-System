import { OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
export declare class EventsGateway implements OnGatewayConnection, OnGatewayDisconnect {
    server: Server;
    private readonly logger;
    handleConnection(client: Socket): void;
    handleDisconnect(client: Socket): void;
    emitImageProcessing(image: any): void;
    emitAlert(alert: any): void;
    emitModelUpdated(model: any): void;
    emitInspectionResult(result: any): void;
}
