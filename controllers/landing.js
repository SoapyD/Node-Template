

exports.getLanding = async(req,res) => {
	

    try{
        // let reports = await databaseQueriesUtil.findData(find_list)
        res.render("landing");
    }
    catch(err){
        console.log(err)
        req.flash("error", "There was an error trying to get report data");
        res.redirect("/")        
    }
	
};


