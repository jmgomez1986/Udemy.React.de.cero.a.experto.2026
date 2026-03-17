interface Props {
  title: string;
  subtitle?: string;
  description?: string;
}

export const CustomHeader = ({ title, subtitle, description }: Props) => {
  return (
    <div className="content-center">
      <h1>{title}</h1>
      {subtitle && <p>{subtitle}</p>}
      {description && <p>{description}</p>}
    </div>
  );
};
