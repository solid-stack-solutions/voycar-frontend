<script>
	import '../app.postcss';

	// Highlight JS
	import hljs from 'highlight.js/lib/core';
	import 'highlight.js/styles/github-dark.css';
	import { storeHighlightJs } from '@skeletonlabs/skeleton';
	import xml from 'highlight.js/lib/languages/xml'; // for HTML
	import css from 'highlight.js/lib/languages/css';
	import javascript from 'highlight.js/lib/languages/javascript';
	import typescript from 'highlight.js/lib/languages/typescript';

	hljs.registerLanguage('xml', xml); // for HTML
	hljs.registerLanguage('css', css);
	hljs.registerLanguage('javascript', javascript);
	hljs.registerLanguage('typescript', typescript);
	storeHighlightJs.set(hljs);

	// Floating UI for Popups
	import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom';
	import { storePopup } from '@skeletonlabs/skeleton';
	storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });
	
	import { TabGroup, Tab, TabAnchor } from '@skeletonlabs/skeleton'; //Menüleiste mit auswählbaren Tabs
	import { page } from '$app/stores'; // hat automatisch alle Pages als Stores
</script>

<TabGroup>
	<TabAnchor href="/" selected={$page.url.pathname === '/'}>Home</TabAnchor>
	<TabAnchor href="/user" selected={$page.url.pathname === '/user'}>User</TabAnchor>
	<TabAnchor href="/reservations" selected={$page.url.pathname === '/reservations'}>Reservierungen</TabAnchor>
</TabGroup>	
<slot />
<footer>Support: telfonnummer</footer>	
