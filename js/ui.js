const panels=['friendsPanel','mailPanel','boxPanel'];
function closeAllPanels(){panels.forEach(p=>document.getElementById(p).classList.add('hidden'))}
function togglePanel(id){
  const el=document.getElementById(id);
  const open=!el.classList.contains('hidden');
  closeAllPanels();
  if(!open)el.classList.remove('hidden');
}
function toggleFriends(){togglePanel('friendsPanel')}
function toggleMail(){togglePanel('mailPanel')}
function toggleBox(){togglePanel('boxPanel')}
