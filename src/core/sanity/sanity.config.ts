/**
 * This config is used to set up Sanity Studio that's mounted on the `/routes/admin/[[...catchall]]` route
 */
import { apiVersion, dataset, projectId } from '$core/sanity/config/sanity.api';
import { settingsPlugin, settingsStructure } from '$core/sanity/plugins/settings';
import { trackType, radioStationType, settingsType } from '$core/sanity/schemas';
import { seoObject } from './schemas/objects';
import { visionTool } from '@sanity/vision';
import { defineConfig } from 'sanity';
import { unsplashImageAsset } from 'sanity-plugin-asset-source-unsplash';
import { media } from 'sanity-plugin-media';
import { deskTool } from 'sanity/desk';

const title = '2am.fm';

export default defineConfig({
	basePath: '/admin',
	projectId: projectId,
	dataset,
	title,
	schema: {
		// If you want more content types, you can add them to this array
		types: [
			// Schemas
			trackType,
			radioStationType,
			settingsType,
			// Objects
			seoObject
		]
	},
	plugins: [
		deskTool({
			structure: settingsStructure(settingsType)
		}),
		// Configures the global "new document" button, and document actions, to suit the Settings document singleton
		settingsPlugin({ type: settingsType.name }),
		// Add an image asset source for Unsplash
		unsplashImageAsset(),
		media(),
		// Vision lets you query your content with GROQ in the studio
		// https://www.sanity.io/docs/the-vision-plugin
		visionTool({ defaultApiVersion: apiVersion })
	]
});
