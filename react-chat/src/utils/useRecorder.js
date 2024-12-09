import {useRef, useState} from "react";
import {toast} from "react-toastify";

export const useRecorder = () => {
    const [isRecording, setIsRecording] = useState(false);
    const [audio, setAudio] = useState(null);
    const audioChunksRef = useRef([]);
    const mediaRecorderRef = useRef(null);

    const startRecording = async () => {
        setIsRecording(true);
        if (navigator.mediaDevices) {
            const constraints = {audio: true};
            audioChunksRef.current = [];

            const stream = await navigator.mediaDevices.getUserMedia(constraints);
            try {
                let mediaRecorder = new MediaRecorder(stream);
                mediaRecorderRef.current = mediaRecorder;

                mediaRecorder.onstop = () => {
                    const blob = new Blob(audioChunksRef.current, {type: "audio/ogg"})
                    setAudio(blob);
                };

                mediaRecorder.ondataavailable = (e) => {
                    audioChunksRef.current.push(e.data);
                };

                mediaRecorder.start();
            } catch (err) {
                toast.error(`The following error occurred: ${err}`);
            }
        }
    }

    const stopRecording = () => {
        setIsRecording(false);
        mediaRecorderRef.current.stop();
    }

    return [startRecording, stopRecording, isRecording, audio]
}