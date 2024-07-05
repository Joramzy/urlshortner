const express = require ("express");
const shortUrlModel=require("./models/short_url.js")
const {nanoid}=require("nanoid");//to create link for our url of random characters

const mongoose=require("mongoose");
const {z}=require("zod");
const inputschema=z.object({longUrl:z.string().url()})
mongoose.connect(process.env.dburl).then(()=>{console.log("connected to DB")})
//mogodb dosent rows and columns, the are called collections
// check input schema
const app=express();
app.use(express.json());



app.post("/short-url",((req,res)=>{
    const body=req.body;
    const validation=inputschema.safeParse(body);
    if(!validation.success){
        return res.status(422).json(
            {
                message:"Invalid url"
            });
    }

    const urlId=nanoid(6);
    // console.log(urlId);
    // console.log(req.hostname);
    const shortUrl=`https://${req.hostname}/${urlId}`;
    // console.log(shortUrl);
    const newshorturl=new shortUrlModel({
        longUrl:body.longUrl,
        shortUrl:urlId
    });
    newshorturl.save().then(()=>{
        res.json({shortUrl})
    }).catch(()=>{
        res.status(500).json({message:"Error creating short url"});

    });

}


)
)

app.get("/:shorturlid",(req,res)=>{
    const short_url_id=req.params.shorturlid;
    shortUrlModel.findOne({
        shortUrl:short_url_id
    }).then((doc)=>{
        if(!doc){
           return res.status(404).json({message:"link not found"})
        };

        res.redirect(doc.longUrl);

    }).catch(()=>{
        res.status(500).json({message:"An Error Occured"});
    })
})

app.listen(3000,function(){
    console.log("server running!!!");
})
//robot to view db
//search for [comonjs, ES modules];
//understand object relational mapper[prisma,mysql,mogodb]