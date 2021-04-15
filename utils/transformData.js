const transform=(items) =>{
const grouped = {}
 for(const item of items) {
  grouped[item.category] = grouped[item.category] || [];
  const itemCopy = { ...item };
  delete itemCopy.category
  grouped[item.category].push(itemCopy)
 }
 
 return grouped;
}
module.exports= transform;