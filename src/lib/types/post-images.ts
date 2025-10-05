export type PostImageSupabaseSaving =
	| {
			data: {
				id: string;
				path: string;
				fullPath: string;
			};
			error: null;
	  }
	| {
			data: null;
			error: Error;
	  };
