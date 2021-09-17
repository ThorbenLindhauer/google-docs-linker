function onOpen(e) {
   DocumentApp.getUi()
       .createMenu('Magic')
       .addItem('Linkify', 'linkify')
       .addToUi();
 }


function linkify(){
  var body = DocumentApp.getActiveDocument().getBody();
  if (body) {
    var matchingRange = null;
    // regex uses RE-2 syntax: https://github.com/google/re2/wiki/Syntax
    while (matchingRange = body.findText("CAM-[[:digit:]]+", matchingRange)) {
      var element = matchingRange.getElement();
      var text = element.editAsText();
    
      var content = text.getText();
      var matchingString = content.substring(matchingRange.getStartOffset(), matchingRange.getEndOffsetInclusive() + 1);

      text.setLinkUrl(matchingRange.getStartOffset(), matchingRange.getEndOffsetInclusive(), "https://jira.camunda.com/browse/" + matchingString)
    }
  }
}