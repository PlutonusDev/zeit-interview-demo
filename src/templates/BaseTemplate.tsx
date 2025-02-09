export const BaseTemplate = (props: {
  children: React.ReactNode;
}) => {
  return (
    <div className="min-h-screen w-full bg-white text-brand-bg antialiased">
      <main>{props.children}</main>
      {/* <FlyonuiScript /> */}
    </div>
  );
};
