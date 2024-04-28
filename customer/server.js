import makeIndex from "./index.js"


const app  = makeIndex




const PORT = 3333

app.listen(PORT,()=>console.log('Listening to port :'+PORT))