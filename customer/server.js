import makeIndex from "./index.js"


const app  = makeIndex




const PORT = process.env.PORT

app.listen(PORT,()=>console.log('Listening to port :'+PORT))