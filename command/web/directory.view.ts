/// <reference path="view.ts" />

class DirectoryView extends View {

	private current: string;

	constructor(id: number, private separator: string) {
		super("static/files.html", "File Browser", id);
	}

	onEnter() {
		Control.addEvent(Control.EventType.DIRECTORY, new DirectoryEvent(this, this.id));
		this.backElement.onclick = () => this.back();

		this.browse("C:");
	}

	onLeave() {
		Control.removeEvent(Control.EventType.DIRECTORY);
	}

	private get backElement() {
		return document.getElementById("back");
	}

	public get table(): HTMLTableElement {
		return <HTMLTableElement>document.getElementById("files");
	}

	public back() {
		let path = this.current;

		if (path.charAt(path.length - 1) === this.separator) {
			path = path.substring(0, path.length - 1);
		}

		path = path.substring(0, path.lastIndexOf(this.separator));

		this.current = null;
		this.browse(path);
	}

	public browse(path: string) {
		if (!this.current) {
			this.current = "";
		}

		path = this.current + path + this.separator;

		this.current = path;

		let data = JSON.stringify({
			"path": path
		});

		Control.instance.write(Control.EventType.DIRECTORY, data, this.id);
		document.title = this.title + " (" + path + ")";
	}
}