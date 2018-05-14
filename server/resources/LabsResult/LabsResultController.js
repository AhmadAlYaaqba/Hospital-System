var LabsResult = require('./LabsResult');
var Users = require('../User/Users');

exports.Create = function (req, res) {
	var newLabRes= new LabsResult(req.body);
	newLabRes.save(function(err,data){
		if (err){
			return console.error(err);
		}
		res.json(data)
	});
};
exports.createResutl=function(req,res){
	Users.findOne({username:req.body.username}).exec(function(err,user){
		if(err){
			res.json(err);
		}
		else if(!user){
			res.json("No user found");
		}else{
			var obj={
			patientId:user._id,
			labTechnicianId:req.body.labTechnicianId,
			medicalExaminationTime:req.body.medicalExaminationTime,
			resultEntryTime:req.body.resultEntryTime,
			imageOfResult:req.body.imageOfResult,
			description:req.body.description
		}
		var labRes=new LabsResult(obj);
		labRes.save(function(err,data){
			if(err){
				res.json(err);
			}else{
				//res.json(data);
			}
		});
		user.labResults.push(labRes._id);
		user.save(function(err,data){
			if(err){
				res.json(err);
			}else{
				//res.json(data);
			}
		});
		res.json("LabsResult been saved in database");
		}
	});

}
 exports.Retrive=function(req,res){
 	LabsResult.find()
 	.populate('labTechnicianId')
 	.populate('patientId')
 	.exec(function(err,data){
 		if(err){
 			console.error(err);
 		}
 		if(!data){
 			res.json("there is no data")
 		}else{
 			res.json(data)
 		}
 	});


 };















 