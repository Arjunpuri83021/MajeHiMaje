const router=require('express').Router()
const cAPi=require('../controler/controlers')


const multer=require('multer');



let storage = multer.diskStorage({
    /// This is for file upload
    destination: function (req, file, cb) {
      cb(null, "./public/uploads"); /// file destination
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + file.originalname); // file name
    },
  });
  
  let upload = multer({
    storage: storage,
    limits: { files: 1024 * 1024 * 6 }, // file limit
  });


  router.get('/',(req,res)=>{
    res.send("hello aman puri goswami")
  })

router.post("/postdata",cAPi.data)

router.get('/getpostdata',cAPi.getpostdata)

router.delete('/deletepost/:id',cAPi.deletepost)

router.put('/updatepost/:postId', cAPi.updatepost);


router.post('/addStar',cAPi.addStar)
router.get('/getstars',cAPi.getstars)
router.put('/updateStar/:starId', cAPi.updateStar); // Update star
router.delete('/deleteStar/:starId', cAPi.deleteStar); // Delete star

router.post('/updateviews/:id',cAPi.updateviews)


router.get('/getindians',cAPi.getindians)
router.get('/getHijabi' ,cAPi.getHijabi)
module.exports = router