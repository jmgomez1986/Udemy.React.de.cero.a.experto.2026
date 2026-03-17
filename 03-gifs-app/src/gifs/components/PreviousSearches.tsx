interface Props {
  title: string;
  previousSearches: string[];
  onLabelClicked: (search: string) => void;
}

export const PreviousSearches = ({
  title,
  previousSearches,
  onLabelClicked,
}: Props) => {
  return (
    <div className="previous-searches">
      <h2>{title}</h2>
      <ul className="previous-searches-list">
        {previousSearches.map((search, index) => (
          <li key={index} onClick={() => onLabelClicked(search)}>
            {search}
          </li>
        ))}
      </ul>
    </div>
  );
};
