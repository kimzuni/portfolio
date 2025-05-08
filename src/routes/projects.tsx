export const list = [
	"project-1",
	"test-project",
] as const;



const items = import.meta.glob([
	"../pages/projects/*.tsx",
	"!**/index.tsx",
], { eager: true });

const pages = Object.fromEntries(Object.entries(items).map(([path, module]) => [path.split("/").reverse()[0].split(".")[0], (module as { default: React.FC }).default]));



export const router = (id: typeof list[number]): React.ReactElement => {
	const Comp = pages[id];
	return <Comp/>;
};
