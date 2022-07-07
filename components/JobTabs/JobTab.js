import { Card, Button } from 'flowbite-react';
import GcodeViewer from 'components/GcodeViewer';

export default function JobTab(props) {
  return (
    <Card>
      <Button.Group>
        <Button size="lg">
          <i className="bi bi-play-fill"/>
        </Button>
        <Button size="lg">
          <i className="bi bi-stop-circle"/>
        </Button>
        <Button size="lg">
          <i className="bi bi-folder-plus"/>
        </Button>
        <Button size="lg">
          <i className="bi bi-download"/>
        </Button>
        <Button size="lg">
          <i className="bi bi-trash"/>
        </Button>
      </Button.Group>

      <div className="flex flex-row">
        <GcodeViewer />
      </div>
    </Card>
  );
}
