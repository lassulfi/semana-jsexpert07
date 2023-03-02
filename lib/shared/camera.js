export default class Camera {
    constructor() {
        this.video = document.createElement('video');
    }

    static async init() {
        if(!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
            throw new Error(
                `Browser API navigator.mediaDevices.getUserMedia not available`
            )
        }

        // listar todos os ids. Isso foi necessário
        // pois o chrome estava considerando apenas a
        // camera virtual do obs e precisei pegar o ID da
        // minha webcam
        navigator.mediaDevices.enumerateDevices()
            .then(function(devices) {
                devices.forEach(function(device) {
                    console.log(device.kind + ": " + device.label +
                                " id = " + device.deviceId);
                });
            })
            .catch(function(err) {
                console.log(err.name + ": " + err.message);
            });
        
        const videoConfig = {
            audio: false,
            video: {
                width: globalThis.screen.availWidth,
                height: globalThis.screen.availHeight,
                frameHate: {
                    ideal: 60
                },
                deviceId: '574e9de7e0e927b832db49a4294d934c6f0a576fb95dbc5d27703ac7fae1c29d'
            }
        }
        const stream = await navigator.mediaDevices.getUserMedia(videoConfig)
        const camera = new Camera()
        camera.video.srcObject = stream

        // debug reasons!
        // camera.video.height = 240
        // camera.video.width = 320
        // document.body.append(camera.video)

        // aguarda pela camera
        await new Promise((resolve) => {
            camera.video.onloadedmetadata = () => {
                resolve(camera.video)
            }
        })

        camera.video.play()

        return camera
    }
}