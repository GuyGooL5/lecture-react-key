import React from "react";
import { Button } from "./components/Button";

interface Counter {
	name: string;
	count: number;
}

const data: Counter[] = ["John", "Jane", "Alice", "Bob"].map((name) => ({
	name,
	count: 0,
}));

const SmallExample = () => {
	const [counters, setCounters] = React.useState<Counter[]>(data);

	const [currentCounterName, setCurrentCounterName] = React.useState<
		string | null
	>(null);

	const currentCounterItem = React.useMemo(
		() => counters.find((c) => c.name === currentCounterName),
		[counters, currentCounterName],
	);

	const handleSave = (data: Counter) => {
		setCounters((prev) => prev.map((c) => (c.name === data.name ? data : c)));
	};

	return (
		<div className="p-2">
			<div className="space-x-2">
				{counters.map(({ name: id, count }) => (
					<Button
						key={id}
						variant="outline"
						onClick={() => setCurrentCounterName(id)}
					>
						{id} ({count})
					</Button>
				))}
			</div>
			{currentCounterItem && (
				<FormComponent
					// key={currentCounterItem.name}
					initialData={currentCounterItem}
					onSave={handleSave}
					onCancel={() => setCurrentCounterName(null)}
				/>
			)}
		</div>
	);
};

export default SmallExample;

interface FormComponentProps {
	initialData: Counter;
	onSave: (data: Counter) => void;
	onCancel: () => void;
}
const FormComponent = ({
	initialData,
	onSave,
	onCancel,
}: FormComponentProps) => {
	const [count, setCount] = React.useState(initialData.count);
	const name = initialData.name;

	return (
		<div className="space-y-2">
			<p>
				{name} has been clicked {count} times
			</p>
			<div className="space-x-2">
				<Button onClick={() => setCount(count + 1)}>Increment</Button>
				<Button onClick={() => setCount(count - 1)}>Decrement</Button>
			</div>
			<div className="space-x-2">
				<Button onClick={() => onSave({ name, count })}>Save</Button>
				<Button onClick={onCancel}>Cancel</Button>
			</div>
		</div>
	);
};
