class SocketBuilder {
    constructor({ socketUrl }) {
        this.socketUrl = socketUrl;


        this.onUserConnected = () => { };
        this.onUserDisconnected = () => { };
    };
    
    setOnUserConnected(fn) {
        this.onUserConnected = fn;
        return this; // Padrão builder, retornamos sempre a instância da classe para que possamos chamar as outras funções dessa classe 
    }

    setOnUserDisconnected(fn) {
        this.onUserDisconnected = fn;
        return this;
    }

    build() {
        const socket = io.connect(this.socketUrl, {
            withCredentials: false
        });

        socket.on('user-connected',this.onUserConnected);
        socket.on('user-disconnected',this.onUserDisconnected);

        return socket;
    }
}