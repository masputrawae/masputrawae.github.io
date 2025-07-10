// types/site.ts
export type SiteParams = {
	/** Example: "https://username.github.io". Don't use "/" at the end. */
	site: string

	/** Base path. Example: "/" or a sub-path like "/example/". */
	base: string

	/** Title of the site. Example: "John Doe Site". */
	siteTitle: string

	/** Author or owner of the site. Example: "John Doe". */
	author: string

	/** Twitter username. Example: "@johndoe". */
	twitterHandle: string

	/** Short tagline. Example: "Just kidding". */
	tagline: string

	/** Site description used as default/fallback when content has no description. */
	description: string

	/** Logo path. Example: "/logo.webp" or external URL like "https://placehold.co/". */
	logo: string

	/** Image/thumbnail path. Example: "/thumbnail.webp" or external URL. */
	image: string

	/** GitHub profile URL. Example: "https://github.com/johndoe". Don't use "/" at the end. */
	github: string

	/** GitHub repo path. Example: "username/repo". */
	repo: string

	/** Branch name. Example: "main". */
	branch: string

	/** Default Themes: Dark / Light, or undefined (dark) */
	defaultThemes?: boolean

	/** Tags */
	tags: string[]
}

/**
 * Represents each item in a sidebar group.
 */
export type SidebarItems = {
	/** Display name. If not provided, use frontmatter title from the markdown file. */
	name?: string

	/** Example: /notes/, or https://www.example/notes/ */
	href: string

	/** Icon for the item. Currently placeholder. Should be updated to actual icon name or path. */
	icon: string

	/** Order of appearance in the sidebar list. Lower = higher priority. */
	order: number
}

/**
 * Represents a group/section in the sidebar.
 */
export type SidebarMenus = {
	/** Unique ID for internal usage. Example: "main-menu" */
	id: string

	/** Label displayed in the sidebar. Example: "Main Menu" */
	label: string

	/** Display order of the sidebar group. */
	order: number

	/** Whether this section should be active (open) by default. */
	defaultActive?: boolean

	/** List of items under this group. */
	items: SidebarItems[]
}
