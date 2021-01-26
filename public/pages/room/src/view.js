/* Tudo que corresponde à tela*/

class View {
    constructor() {

    }

    createVideoElement({ muted = true, src, srcObjetc }) {
        const video = document.createElement('video');
        video.muted = muted;
        video.src = src;
        video.srcObject = srcObjetc;

        if (src) {
            video.controls = true;
            video.loop = true;
            Utils.sleep(200).then(_ => video.play()); //Para evitar exception pois o video ainda não terminou de ser carregado;
        }
        if (srcObjetc) { // quando conseguir ler os metadados da stream, pode dar o play
            video.addEventListener("loadedmetadata", _ => {
                video.play()
            }
            );
            
        }
        return video;
    }

    renderVideo({ userId, stream = null, url = null, isCurrentId = false }) {
        const video = this.createVideoElement({ src: url, srcObjetc: stream });
        this.appendToHTMLTree({ userId, video, isCurrentId });
    }

    appendToHTMLTree({ userId, video, isCurrentId }) {
        const div = document.createElement('div');
        div.id = userId;
        div.classList.add('wrapper');
        div.append(video);

        const div2 = document.createElement('div');
        div2.innerText = isCurrentId ? '' : userId;
        div.append(div2);

        const videoGrid = document.getElementById('video-grid');
        videoGrid.append(div);


    }


}