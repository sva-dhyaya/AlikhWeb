import Constansts from "../alikh.constants.js";
import alikhUtils from "@/alikh.utils.js";
import axios from "axios";

axios.defaults.baseURL = window.location.origin;


class DispatcherEvent {
    constructor(eventName) {
        this.eventName = eventName;
        this.callbacks = [];
    }

    registerCallback(callback) {
        this.callbacks.push(callback);
    }

    unregisterCallback(callback) {
        const index = this.callbacks.indexOf(callback);
        if (index > -1) {
            this.callbacks.splice(index, 1);
        }
    }

    fire(data) {
        const callbacks = this.callbacks.slice(0);
        callbacks.forEach((callback) => {
            callback(data);
        });
    }
}


class FileUploader {

    constructor(file, dstDir, sessionId, start = true) {
        this.file = file;
        this.dstPath = dstDir
        this.fileName = this.file.name
        this.fileSize = this.file.size
        this.sessionId = sessionId;
        this.chunkSize = 1*1024*1024;
        if (this.chunkSize > this.fileSize) {
            this.chunkSize = Math.round(this.fileSize / 2);
        }
        this.filePos = 0;
        this.uploadPercentage = 0;
        this.bandwidth = 0;
        this.totalUploaded = 0;
        this.status = "INITIALIZING";
        this.events = {};
        this.startTime = null
        this.completeResponse = {}
        if (start) {
            this.start()
        }
    }

    humanizeBandwidth(bytes) {
        if (!bytes || bytes == 0) {
            return { bandwidth: 0, unit: "KB/s" };
        }
        if (bytes < 0) {
            return { bandwidth: 0, unit: "KB/s" };
        }
        if (bytes < 1024) return { bandwidth: bytes.toFixed(2), unit: " B/s" };
        else if (bytes < 1048576)
            return { bandwidth: (bytes / 1024).toFixed(2), unit: "KB/s" };
        else if (bytes < 1073741824)
            return { bandwidth: (bytes / 1048576).toFixed(2), unit: "MB/s" };
        else if (bytes < 1099511627776)
            return { bandwidth: (bytes / 1073741824).toFixed(2), unit: "GB/s" };
        else return { bandwidth: (bytes / 1099511627776).toFixed(2), unit: "TB/s" };
    }

    getProgressInfo() {
        this.bandwidth = this.humanizeBandwidth(
            this.totalUploaded / ((performance.now() - this.startTime) / 1000)
        )
        return {
            bandwidth: this.humanizeBandwidth(
                this.totalUploaded / ((performance.now() - this.startTime) / 1000)
            ),
            uploadedPercentage: this.uploadPercentage,
            sessionId: this.sessionId,
            status: this.status,
            uploaded: this.totalUploaded
        }
    }

    async resumableUpload(filePos, chunkSize = -1) {
        if (chunkSize < 0) {
            return;
        }
        let blob = this.file.slice(filePos, filePos + chunkSize);
        axios
            .post(encodeURIComponent(`${Constansts.nginxUploadUrl}/${this.dstPath}`), blob, {
                headers: {
                    // "Content-Length": chunkSize,
                    "Content-Type": "application/octet-stream",
                    "Content-Disposition": `attachment; filename = "${this.fileName}"`,
                    "X-Content-range": `bytes ${filePos}-${filePos + chunkSize - 1}/${this.fileSize
                        }`,
                    "Session-Id": this.sessionId,
                    "File-Name": this.fileName,
                    "Dst-Dir": this.dstPath,
                    "File-Size": this.fileSize,
                    "First-Chunk": filePos == 0 ? true : false,
                    "Last-Chunk": filePos + chunkSize >= this.fileSize ? true : false,
                    "Uploaded-bytes": filePos + chunkSize,
                    "Src-Path": `${this.dstPath}/${this.sessionId}`,
                    "User-Id": alikhUtils.getCookieValue("userId"),
                    "User-Name": alikhUtils.getCookieValue("userInfo").username,
                    "User-Type": alikhUtils.getCookieValue("userInfo").user_type,
                },
                onUploadProgress: function () {
                    if (filePos + chunkSize >= this.fileSize) {
                        this.uploadPercentage = 100;
                    } else {
                        this.uploadPercentage = parseInt(
                            Math.round(((filePos + chunkSize) / this.fileSize) * 100)
                        );
                    }
                    this.dispatch("progress", this.getProgressInfo())
                }.bind(this),
            })
            .then(() => {
                this.totalUploaded = filePos + chunkSize
                this.status = "INPROGRESS"
                this.filePos = this.filePos + chunkSize;
                if (this.filePos + chunkSize >= this.fileSize) {
                    this.resumableUpload(this.filePos, this.fileSize - this.filePos);
                    this.status = "COMPLETED"
                    this.dispatch("complete", this.getProgressInfo())
                    return;
                } else {
                    this.resumableUpload(this.filePos, chunkSize);
                }
            })
            .catch((error) => {
                this.status = "FAILED"
                this.uploadPercentage = -1
                console.log(`Failed to upload file->${this.fileName}, error->${error}`);
            });
    }

    start() {
        this.startTime = performance.now()
        this.resumableUpload(this.filePos, this.chunkSize)
    }

    dispatch(eventName, data) {
        const event = this.events[eventName];
        if (event) {
            event.fire(data);
        }
    }

    on(eventName, callback) {
        let event = this.events[eventName];
        if (!event) {
            event = new DispatcherEvent(eventName);
            this.events[eventName] = event;
        }
        event.registerCallback(callback);
    }

    off(eventName, callback) {
        const event = this.events[eventName];
        if (event && event.callbacks.indexOf(callback) > -1) {
            event.unregisterCallback(callback);
            if (event.callbacks.length === 0) {
                delete this.events[eventName];
            }
        }
    }

}


export default FileUploader;
