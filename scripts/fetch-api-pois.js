fetch('http://localhost:3000/api/pois').then(async r => {
  const data = await r.json();
  const firstPoi = data.pois[0];
  console.log("FIRST POI TAGS:", JSON.stringify(firstPoi.tags, null, 2));
}).catch(console.error);
