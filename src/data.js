export const town={
buildings:[
{id:"signpost",name:"The Signpost",icon:"↟",x:12,y:18,color:"#B9573F",description:"The town’s starting point, where paths and proposals meet.",residentIds:["mara"],detail:"The first landmark has never quite settled which way is forward. Use it to orient yourself and find the route for proposing something new."},
{id:"archive",name:"Small Hours Archive",icon:"▥",x:61,y:13,color:"#72566F",description:"The record of what changed, and why.",residentIds:["oren"],detail:"The Archive keeps maps, field notes, and careful accounts of revisions—including ideas that changed."},
{id:"workshop",name:"Patchwork Works",icon:"⚒",x:72,y:53,color:"#B9573F",description:"A practical workshop for ideas that need testing.",residentIds:["kit"],detail:"Plans are pinned up, prototypes are tried, and nothing is called finished before it works."},
{id:"garden",name:"The Long Table",icon:"♧",x:38,y:62,color:"#47704E",description:"A garden and shared table for slower conversations.",residentIds:["iona"],detail:"Residents bring questions here when they need more daylight, more viewpoints, or somewhere to set down a mug."},
{id:"lookout",name:"Weatherstep",icon:"⌁",x:8,y:61,color:"#4E8291",description:"A hilltop lookout for seeing the whole town at once.",residentIds:["tavi"],detail:"From Weatherstep, footpaths become patterns and empty plots become possibilities—not promises."}],
residents:[
{id:"mara",name:"Mara Venn",pronouns:"she/her",role:"Sign painter",avatar:"MV",bio:"Believes a useful sign tells you where you are before it tells you where to go."},
{id:"oren",name:"Oren Vale",pronouns:"he/him",role:"Archivist",avatar:"OV",bio:"Records decisions without sanding off the uncertainty."},
{id:"kit",name:"Kit Bramble",pronouns:"they/them",role:"Workshop keeper",avatar:"KB",bio:"Asks what an idea is for, who can use it, and what happens when it breaks."},
{id:"iona",name:"Iona Peat",pronouns:"she/her",role:"Gardener and host",avatar:"IP",bio:"Patient with seedlings and impatient with vague invitations."},
{id:"tavi",name:"Tavi Rook",pronouns:"she/her",role:"Lookout",avatar:"TR",bio:"Will not call a new roof complete until someone has checked the door."}],
notices:[
{id:"stool-audit",title:"Stool audit",date:"2026-10-22",seeded:true,body:"The Square has seven stools and eight opinions about where they belong. Mara requests one measuring tape."},
{id:"hinges",title:"Hinges wanted",date:"2026-10-22",seeded:true,body:"Patchwork Works needs two quiet hinges. Squeaky hinges may submit a compelling explanation."},
{id:"open-plot",title:"Open plot",date:"2026-10-22",seeded:true,body:"The plot east of the garden has no assigned use. Explore first, then propose what would make the map more useful or delightful."},
{id:"lost-umbrella",title:"Lost: one extremely patient umbrella",date:"2026-10-22",seeded:true,residentId:"mara",body:"Please return the moss-green umbrella last seen waiting outside the bakery. — Mara Venn",sourceUrl:"https://github.com/spudlab-xyz/tiny-town/issues/2"}],history:[]};
export function indexTown(data=town){return{residents:new Map(data.residents.map(r=>[r.id,r])),buildings:new Map(data.buildings.map(b=>[b.id,b]))};}
