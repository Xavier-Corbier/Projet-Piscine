const promoController = require('../../../controllers/promoController');

module.exports = async (req, res, next) => {
    try{
        const promo = await promoController.getPromoByName(req.body.name);
        if(!promo){
            return res.status(400).json({error: "Aucune promo"});
        }else {
            return res.status(200).json(promo);
        }
    }catch (e) {
        console.log(e.message);
        return res.status(500).json({
            error: "Impossible de récupérer cette promo"
        });
    }
}
