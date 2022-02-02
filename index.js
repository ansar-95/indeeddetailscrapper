const rp = require('request-promise');
const $ = require('cheerio').default;
const { htmlToText } = require('html-to-text');

function IndeedKey(link){
    const words = link.split('?');
    console.log(words);
    const words2 = words[1].split('&');
    console.log(words2);
    var jk ='';
    for(var i = 0; i< words2.length;i++){

      if(words2[i].match('^jk') || words2[i].match('^vjk')){
        const words3 = words2[i].split('=');
        return jk = words3[1];
      }
    }

}

async function IndeedData(link){
    const linkJobDetails = 'https://fr.indeed.com/voir-emploi?viewtype=embedded&jk='+link;
    
    var html = await rp(linkJobDetails)
    .then(function(html){
        return html;
    })
    .catch(function(err){
        console.log(err);
    })

    var postTitle,typeContract,companyName,lieu,description;
    postTitle = $("h1",html).text();
    companyName = $("#viewJobSSRRoot > div > div.icl-Container--fluid.fs-unmask.jobsearch-ViewJobLayout-fluidContainer.is-FR > div > div > div > div.jobsearch-ViewJobLayout-jobDisplay.icl-Grid-col.icl-u-xs-span12.icl-u-lg-span7 > div > div.jobsearch-JobComponent-embeddedHeader > div > div:nth-child(2) > div.jobsearch-CompanyInfoContainer > div > div > div > div:nth-child(2) > div",html).html();
    if(companyName == null){
      companyName = $("#viewJobSSRRoot > div > div.icl-Container--fluid.fs-unmask.jobsearch-ViewJobLayout-fluidContainer.is-FR > div > div > div > div.jobsearch-ViewJobLayout-jobDisplay.icl-Grid-col.icl-u-xs-span12.icl-u-lg-span7 > div > div.jobsearch-JobComponent-embeddedHeader > div > div:nth-child(1) > div.jobsearch-CompanyInfoContainer > div > div > div > div.jobsearch-InlineCompanyRating.icl-u-xs-mt--xs.icl-u-xs-mb--md > div:nth-child(2) > div",html).text();
      typeContract = $("#viewJobSSRRoot > div > div.icl-Container--fluid.fs-unmask.jobsearch-ViewJobLayout-fluidContainer.is-FR > div > div > div > div.jobsearch-ViewJobLayout-jobDisplay.icl-Grid-col.icl-u-xs-span12.icl-u-lg-span7 > div > div.jobsearch-JobComponent-embeddedHeader > div > div:nth-child(2) > div:nth-child(1) > div",html).text();
      lieu = $("#viewJobSSRRoot > div > div.icl-Container--fluid.fs-unmask.jobsearch-ViewJobLayout-fluidContainer.is-FR > div > div > div > div.jobsearch-ViewJobLayout-jobDisplay.icl-Grid-col.icl-u-xs-span12.icl-u-lg-span7 > div > div.jobsearch-JobComponent-embeddedHeader > div > div:nth-child(1) > div.jobsearch-CompanyInfoContainer > div > div > div > div:nth-child(2) > div",html).html();
      
    }else{
      typeContract = $("#viewJobSSRRoot > div > div.icl-Container--fluid.fs-unmask.jobsearch-ViewJobLayout-fluidContainer.is-FR > div > div > div > div.jobsearch-ViewJobLayout-jobDisplay.icl-Grid-col.icl-u-xs-span12.icl-u-lg-span7 > div > div.jobsearch-JobComponent-embeddedHeader > div > div:nth-child(3) > div:nth-child(1) > div > span",html).html();
      companyName = $("#viewJobSSRRoot > div > div.icl-Container--fluid.fs-unmask.jobsearch-ViewJobLayout-fluidContainer.is-FR > div > div > div > div.jobsearch-ViewJobLayout-jobDisplay.icl-Grid-col.icl-u-xs-span12.icl-u-lg-span7 > div > div.jobsearch-JobComponent-embeddedHeader > div > div:nth-child(2) > div.jobsearch-CompanyInfoContainer > div > div > div > div.jobsearch-InlineCompanyRating.icl-u-xs-mt--xs.icl-u-xs-mb--md > div:nth-child(2) > div > a",html).html();
  
    }
    const listItems = $(".jobsearch-jobDescriptionText",html);
    listItems.each(function (idx, el) {
      description += $(el).html();
    });
    description = htmlToText(description);

    return { jobTitle :postTitle, location : lieu, nomEntreprise : companyName,typeDeContrat : typeContract, descriptionPost :description };

    
}



module.exports.IndeedData = IndeedData;
module.exports.IndeedKey = IndeedKey;

