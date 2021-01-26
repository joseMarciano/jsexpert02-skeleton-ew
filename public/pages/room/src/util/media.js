/* Classe responsável por trabalhar com todas as mídias da aplicação */

class Media {
    async getCamera(audio = false, video = true){
        return navigator.mediaDevices.getUserMedia({ // para obter os dados do usuário
            video,
            audio
        });
    }
}