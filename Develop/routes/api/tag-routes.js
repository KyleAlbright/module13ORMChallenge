const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  try{
     // be sure to include its associated Product data
     const tagData = await Tag.findAll({
      include: [{ model: Product, through: ProductTag}]
     })
     res.status(200).json(tagData)
  } catch(err){
    res.status(500).json(err)
  }
 
});

router.get('/:id', (req, res) => {
  try{
   // find a single tag by its `id`
  // be sure to include its associated Product data
  const tagData = await Tag.findByPk(req.params.id, {include: [{model: Product, through: ProductTag}]});

  if(!tagData){
    res.status(404).json({ message: 'No tag found with that id!'});
    return;
  }
  
  res.status(200).json(tagData);
} catch(err) {
  res.status(500).json(err)
}
});

router.post('/', (req, res) => {
  // create a new tag
  try{
    const tagData = await Tag.create(req.body);
    res.status(200).json(tagData);
  } catch (err) {
    res.status(400).json(err)
  }
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  try{
    tagData = await Tag.update(
      
      {tag_name: req.body.tag_name},
      {where: {
        id: req.params.id,
      },}
      
      );
      if(!tagData[0]){
    res.status(404).json({message: 'No such tag!'});
    return;
  }  res.status(200).json('Category updated!');
} catch (err) {
  res.status(500).json(err)
}
});

router.delete('/:id', (req, res) => {
  // delete one tag by its `id` value
  try{
    const tagData = await Tag.destroy({
      where: { id: req.params.id}
    });
    if(!tagData) {
      res.status(404).json({ message: "No tag with this id!"});
      return
    }
  res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err)
  }
});

module.exports = router;
