//ffmpeg
const main = async () => {
    const FFMPEGOperation = require('./ffmpeg_op')
    const FFMPEGOperationObj = new FFMPEGOperation()
    const videoPath = './input/2.mp4'
    const outputPath = './output/'
    //获取视频时长
    const duration = await FFMPEGOperationObj.getVideoTotalDuration(videoPath)
    console.log(duration)
    //获取缩略图
    await FFMPEGOperationObj.getVideoSceenshots(videoPath,outputPath,1,5)
    //拆分视频
    // await FFMPEGOperationObj.splitVideo(videoPath,100,10,outputPath+'splitResult.mp4')
  }
  main().then().catch(console.error)