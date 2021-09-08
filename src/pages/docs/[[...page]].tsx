import { getCurrentProjectTag } from '@contexts/ProjectCurrentTagContext';
import { updateProjectSelection } from '@contexts/ProjectSelectionContext';
import { updateProjectTags } from '@contexts/ProjectTagsContext';
import { Box, Container, Typography } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import DocsLayout from '@presentational/Documentation/DocsLayout';
import Link from '@routing/Link';
import { fetchBranchesAndTags, SapphireCommunity } from '@utils/gh-fetch';
import type { InferGetServerSidePropsType, NextPage } from 'next';
import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

const useStyles = makeStyles((theme) =>
	createStyles({
		boldText: {
			fontWeight: theme.typography.fontWeightBold
		}
	})
);

const DocumentationPage: NextPage<InferGetServerSidePropsType<typeof getServerSideProps>> = ({ selectableBranchesAndTags }) => {
	const router = useRouter();
	const setProjectTags = updateProjectTags();
	const setProjectSelection = updateProjectSelection();
	const currentProjectTag = getCurrentProjectTag();

	const [pkg /* , version, section, page*/] = router.query.page ?? [undefined, 'stable', 'getting-started', 'getting-started'];

	const classes = useStyles();

	useEffect(() => {
		if (!pkg) {
			void router.replace(`${router.asPath}/framework/stable/getting-started/getting-started`);
		}
	}, [pkg, router]);

	useEffect(() => {
		setProjectTags(selectableBranchesAndTags);
		setProjectSelection((pkg as SapphireCommunity | undefined) ?? SapphireCommunity.Framework);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		console.log('current tag:', currentProjectTag);
	}, [currentProjectTag]);

	return (
		<>
			<NextSeo title="Documentation" />

			<DocsLayout branchesAndTags={selectableBranchesAndTags}>
				<Box p={1.25} m={1.25}>
					<Container>
						<Typography variant="body1">This website is currently being worked on and has no documentation available.</Typography>
						<Typography variant="body1">
							Furthermore, actual, full guides akin to Akairo, D.js, and Klasa are still being worked on.
						</Typography>
						<Typography variant="body1">
							When using @sapphire/framework "v2" (a.k.a. "@next"), the guides will be hosted on{' '}
							<Link href="https://discordjs.guide/" text="discordjs.guide" TextTypographyProps={{ variant: 'body1' }} />. The latest
							preview deploy version of these guides can be found{' '}
							<Link
								href="https://deploy-preview-711--discordjs-guide.netlify.app/sapphire/"
								text="here"
								TextTypographyProps={{ variant: 'body1' }}
							/>
							.
						</Typography>

						<Typography variant="body1">You can also look at bots that are using Sapphire right now:</Typography>
						<ul>
							<li>
								<Link
									href="https://github.com/sapphiredev/examples"
									text="Official Bot Examples ¹ ² ⁴ ⁵ ᴶˢ ⱽ²"
									TextTypographyProps={{ variant: 'body1', classes: { root: classes.boldText } }}
								/>
							</li>
							<li>
								<Link
									href="https://github.com/skyra-project/alestra"
									text="Alestra ⁵"
									TextTypographyProps={{ variant: 'body1', classes: { root: classes.boldText } }}
								/>
							</li>
							<li>
								<Link
									href="https://github.com/favware/archangel"
									text="Archangel ¹ ² ⁴ ⁵"
									TextTypographyProps={{ variant: 'body1', classes: { root: classes.boldText } }}
								/>
							</li>
							<li>
								<Link
									href="https://github.com/dasby-project/Dasby"
									text="Dasby"
									TextTypographyProps={{ variant: 'body1', classes: { root: classes.boldText } }}
								/>
							</li>
							<li>
								<Link
									href="https://github.com/cytrus-re/debia"
									text="Debia ⁵"
									TextTypographyProps={{ variant: 'body1', classes: { root: classes.boldText } }}
								/>
							</li>
							<li>
								<Link
									href="https://github.com/skyra-project/evlyn"
									text="Evlyn ⁵"
									TextTypographyProps={{ variant: 'body1', classes: { root: classes.boldText } }}
								/>
							</li>
							<li>
								<Link
									href="https://github.com/Stitch07/godfather"
									text="Godfather ¹ ³ ⁵"
									TextTypographyProps={{ variant: 'body1', classes: { root: classes.boldText } }}
								/>
							</li>
							<li>
								<Link
									href="https://github.com/RealShadowNova/materia"
									text="Materia ² ⁴ ⱽ²"
									TextTypographyProps={{ variant: 'body1', classes: { root: classes.boldText } }}
								/>
							</li>
							<li>
								<Link
									href="https://github.com/Chiitoi/Olivia"
									text="Olivia"
									TextTypographyProps={{ variant: 'body1', classes: { root: classes.boldText } }}
								/>
							</li>
							<li>
								<Link
									href="https://github.com/PenguBot/bot-sapphire"
									text="Pengu"
									TextTypographyProps={{ variant: 'body1', classes: { root: classes.boldText } }}
								/>
							</li>
							<li>
								<Link
									href="https://github.com/KunoichiZ/Sapphire"
									text="Sapphire"
									TextTypographyProps={{ variant: 'body1', classes: { root: classes.boldText } }}
								/>
							</li>
							<li>
								<Link
									href="https://github.com/skyra-project/skyra"
									text="Skyra ³ ⁴ ⁵"
									TextTypographyProps={{ variant: 'body1', classes: { root: classes.boldText } }}
								/>
							</li>
							<li>
								<Link
									href="https://github.com/syrus-bot/syrus-bot"
									text="Syrus ᴶˢ"
									TextTypographyProps={{ variant: 'body1', classes: { root: classes.boldText } }}
								/>
							</li>
							<li>
								<Link
									href="https://github.com/Varrock-Stray-Dog/Varrock-Stray-Dog"
									text="Varrock-Stray-Dog ⁵"
									TextTypographyProps={{ variant: 'body1', classes: { root: classes.boldText } }}
								/>
							</li>
							<li>
								<Link
									href="https://github.com/FrenchDiscord/YliasDiscordBot"
									text="YliasDiscordBot ³ ⁴ ⱽ²"
									TextTypographyProps={{ variant: 'body1', classes: { root: classes.boldText } }}
								/>
							</li>
						</ul>
						<p>
							<Typography component="span" variant="body1" classes={{ root: classes.boldText }}>
								¹
							</Typography>
							<Typography component="span">
								: Uses <a href="https://esbuild.github.io">ESBuild</a> to compile
							</Typography>
							<br />
							<Typography component="span" variant="body1" classes={{ root: classes.boldText }}>
								²
							</Typography>
							<Typography component="span">: Uses ESM (if not specified then uses CJS)</Typography>
							<br />
							<Typography component="span" variant="body1" classes={{ root: classes.boldText }}>
								³
							</Typography>
							<Typography component="span">: Advanced bot (if not specified it is a simple bot, or not graded)</Typography>
							<br />
							<Typography component="span" variant="body1" classes={{ root: classes.boldText }}>
								⁴
							</Typography>
							<Typography component="span">: Actively developed / maintained with latest Sapphire changes</Typography>
							<br />
							<Typography component="span" variant="body1" classes={{ root: classes.boldText }}>
								⁵
							</Typography>
							<Typography component="span">: Uses Docker in production</Typography>
							<br />
							<Typography component="span" variant="body1" classes={{ root: classes.boldText }}>
								ᴶˢ
							</Typography>
							<Typography component="span">: Written in JavaScript. If not specified then the bot is written in TypeScript.</Typography>
							<br />
							<Typography component="span" variant="body1" classes={{ root: classes.boldText }}>
								ⱽ²
							</Typography>
							<Typography component="span">: Bot has been updated for Sapphire Framework V2 </Typography>
						</p>
					</Container>
				</Box>
			</DocsLayout>
		</>
	);
};

export const getServerSideProps = async () => ({
	props: {
		selectableBranchesAndTags: await fetchBranchesAndTags(SapphireCommunity.Framework)
	}
});

declare module 'querystring' {
	interface ParsedUrlQuery {
		page?: string;
	}
}

export default DocumentationPage;
