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
	import { AppBar } from '@skeletonlabs/skeleton'; // App Bar

    import Logo from "$lib/assets/logo-full-white.svg";
    // these are skeleton svelte components!
    import { LightSwitch } from "@skeletonlabs/skeleton";
</script>
<AppBar gridColumns="grid-cols-3" slotDefault="place-self-center" slotTrail="place-content-end">
	<svelte:fragment slot="lead">
		<svg class="h-8 w-8 text-slate-100"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round">  
			<line x1="3" y1="12" x2="21" y2="12" />  
			<line x1="3" y1="6" x2="21" y2="6" />  
			<line x1="3" y1="18" x2="21" y2="18" />
		</svg>
	</svelte:fragment>
	<img src={Logo} alt="logo" class="w-500" />
	<svelte:fragment slot="trail">
		<a href="/user"> <!--UserIcon-->
			<svg class="h-8 w-8 text-slate-100"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round">  
				<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />  
				<circle cx="12" cy="7" r="4" />
			</svg>
		</a>
        <LightSwitch/>
	</svelte:fragment>
</AppBar>


<TabGroup>
	<TabAnchor href="/" selected={$page.url.pathname === '/'}>Home</TabAnchor>
	<TabAnchor href="/reservations" selected={$page.url.pathname === '/reservations'}>Reservierungen</TabAnchor>
</TabGroup>	
<slot />
<footer style="text-align: center;">Support: telefonnummer</footer>	