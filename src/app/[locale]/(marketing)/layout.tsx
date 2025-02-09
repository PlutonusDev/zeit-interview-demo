import { BaseTemplate } from '@/templates/BaseTemplate';

export default async function Layout(props: {
  children: React.ReactNode;
}) {
  return (
    <BaseTemplate>
      {props.children}
    </BaseTemplate>
  );
}
