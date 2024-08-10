const Data = require('../model/dataModel');
const Stars = require('../model/Stars.model')


exports.data = async (req, res) => {
  console.log(req.body);
  const { videoNo, views, link, imageUrl,titel,minutes,Category } = req.body;

  try {
    const record = new Data({
      imageUrl: imageUrl,
      videoNo: videoNo,
      views: views,
      link: link,
      titel:titel,
      minutes:minutes,
      Category:Category
    });

    await record.save();
    console.log(record);
    res.json(record);
  } catch (error) {
    console.log("error in data post api", error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getpostdata = async (req, res) => {
  try {
    const record = await Data.find();
    res.json(record);
  } catch (error) {
    console.log("error in get post data api", error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.deletepost = async (req, res) => {
  const id = req.params.id;
  try {
    const record = await Data.findByIdAndDelete(id);
    res.json(record);
  } catch (error) {
    console.log("error in delete post api", error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


exports.updatepost = async (req, res) => {
    const postId = req.params.postId;
    const { videoNo, views, link, imageUrl ,titel,minutes,Category} = req.body;
  
    try {
      const updatedRecord = await Data.findByIdAndUpdate(
        postId,
        { imageUrl, videoNo, views, link ,titel,minutes,Category},
        { new: true } // This option returns the modified document rather than the original.
      );
  
      if (!updatedRecord) {
        return res.status(404).json({ error: 'Post not found' });
      }
  
      res.json(updatedRecord);
    } catch (error) {
      console.log("Error in update post API", error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };





  exports.addStar = async(req,res)=>{
    const {starUrl,starName,starLike,starImgUrl} = req.body
    const record= await new Stars({
      starurl:starUrl,
      starName:starName,
      likes:starLike,
      starImgUrl:starImgUrl
     })
     await record.save()
    //  console.log(record)
     res.json(record)
  }


  exports.getstars = async(req,res)=>{
   const record= await Stars.find()
   res.json(record)
  }


  // Update a star by ID
exports.updateStar = async (req, res) => {
  const starId = req.params.starId;
  const { starUrl, starName, starLike, starImgUrl } = req.body;

  try {
    const updatedStar = await Stars.findByIdAndUpdate(
      starId,
      { starurl: starUrl, starName, likes: starLike, starImgUrl },
      { new: true } // This option returns the modified document rather than the original.
    );

    if (!updatedStar) {
      return res.status(404).json({ error: 'Star not found' });
    }

    res.json(updatedStar);
  } catch (error) {
    console.log("Error in update star API", error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Delete a star by ID
exports.deleteStar = async (req, res) => {
  const starId = req.params.starId;

  try {
    const deletedStar = await Stars.findByIdAndDelete(starId);

    if (!deletedStar) {
      return res.status(404).json({ error: 'Star not found' });
    }

    res.json(deletedStar);
  } catch (error) {
    console.log("Error in delete star API", error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.updateviews = async (req, res) => {
  const { id } = req.params;
  const { views } = req.body;

  try {
    const updatedPost = await Data.findByIdAndUpdate(id, { views }, { new: true });
    if (!updatedPost) {
      return res.status(404).json({ error: 'Post not found' });
    }
    res.json(updatedPost);
  } catch (error) {
    console.log("Error in update views API", error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


exports.getindians = async(req,res)=>{
   const record=await Data.find({Category:'indian'})
   res.json(record)
}


exports.getHijabi = async(req,res)=>{
  const record=await Data.find({Category:'hijabi'})
  res.json(record)
}