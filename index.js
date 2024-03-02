const{ S3Client ,GetObjectCommand,PutObjectCommand,ListObjectsV2Command, DeleteObjectCommand} =require("@aws-sdk/client-s3")
const { getSignedUrl } =require("@aws-sdk/s3-request-presigner")
const dotEnv=require("dotenv")

dotEnv.config()
const s3client=new S3Client({
    region:"ap-south-1",
    credentials:{
        accessKeyId:process.env.accessKeyId,
        secretAccessKey:process.env.secretAccessKey
    }
})


async function getObjectURL(key){
    const command=new GetObjectV2Command({
        Bucket:"private-bucket-123",
        Key:key,
    })
    const url= await getSignedUrl(s3client,command)
    return url
}


async function putObjectURL(filename,contentType){
    const command=new PutObjectCommand({
        Bucket:"private-bucket-123",
        Key:`/uploads/user-uploads/${filename}`,
        ContentType:contentType

    })
    const url= await getSignedUrl(s3client,command)
    return url
}

async function listObjects(){
    const command=new ListObjectsV2Command({
        Bucket:"private-bucket-123",
        key:"/"
    })
    const result=await s3client.send(command)
    console.log(result)
}

async function init(){
    //await listObjects();
    const cmd = new DeleteObjectCommand({
        Bucket:"private-bucket-123",
        Key:"index.html"
    })
    await s3client.send(cmd)
}

// async function init(){

// console.log("URL for index.html",await getObjectURL("/uploads/user-uploads/image-1709362528721.jpeg"))
// //console.log("URL for index.html",await putObjectURL(`image-${Date.now()}.jpeg`,"image/jpg"))

// }

init()