Chaque morceau de css est inscrit dans un fichier relatif à sa vue/script. Les caractéristiques transverses à plusieurs vues sont inscrites dans le fichier transverse.css

transverse.css=> a, a:hover, .panel

LAYOUT=> toute les caractéristiques relatives aux vues et sous-vues

	global.scss => concerne les id et div de index.html => 
		body(.paddingSection), #header(), #secondpart(), #thirdpart(), #footer(), #js-getstarted()
		FOUNDATION(fixed, top-bar, toggle-topbar, menu-icon)

	keyfact.scss => KeyFactsView.html +index.html(.keyfact)


CHARTS=> toute les carastéristiques propres aux scripts générateurs d'éléments graphiques utilisés par les vues et sous-vues

	depth.scss =>